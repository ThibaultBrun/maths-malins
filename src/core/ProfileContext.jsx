import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const ProfileContext = createContext(null)

const STORAGE_KEY = 'mathkids.profile.v1'

const MODULE_IDS = ['multiplications', 'additions', 'soustractions', 'divisions']

function emptyModuleProgress() {
  return { lessonStars: {}, mastery: {}, seenDiscovery: {} }
}

function defaultProfile() {
  const progress = {}
  for (const id of MODULE_IDS) progress[id] = emptyModuleProgress()
  return { name: '', avatar: '🦊', stars: 0, progress }
}

function migrate(stored) {
  // Compat avec ancienne forme (multiplications.tableStars)
  const base = defaultProfile()
  if (!stored) return base
  const merged = { ...base, ...stored }
  merged.progress = { ...base.progress }
  for (const id of MODULE_IDS) {
    const src = stored.progress?.[id] || {}
    const base2 = emptyModuleProgress()
    const lessonStars = src.lessonStars || src.tableStars || base2.lessonStars
    merged.progress[id] = {
      ...base2,
      ...src,
      lessonStars,
    }
  }
  return merged
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return migrate(raw ? JSON.parse(raw) : null)
  } catch {
    return defaultProfile()
  }
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const addStars = useCallback((n) => {
    setProfile((p) => ({ ...p, stars: p.stars + n }))
  }, [])

  const recordAnswer = useCallback((moduleId, key, correct) => {
    setProfile((p) => {
      const mod = p.progress[moduleId] || emptyModuleProgress()
      const current = mod.mastery[key] || 0
      const next = correct ? Math.min(5, current + 1) : Math.max(0, current - 1)
      return {
        ...p,
        progress: {
          ...p.progress,
          [moduleId]: { ...mod, mastery: { ...mod.mastery, [key]: next } },
        },
      }
    })
  }, [])

  const setLessonStars = useCallback((moduleId, lessonId, stars) => {
    setProfile((p) => {
      const mod = p.progress[moduleId] || emptyModuleProgress()
      const current = mod.lessonStars[lessonId] || 0
      if (stars <= current) return p
      return {
        ...p,
        progress: {
          ...p.progress,
          [moduleId]: { ...mod, lessonStars: { ...mod.lessonStars, [lessonId]: stars } },
        },
      }
    })
  }, [])

  const markDiscoverySeen = useCallback((moduleId, lessonId) => {
    setProfile((p) => {
      const mod = p.progress[moduleId] || emptyModuleProgress()
      return {
        ...p,
        progress: {
          ...p.progress,
          [moduleId]: { ...mod, seenDiscovery: { ...mod.seenDiscovery, [lessonId]: true } },
        },
      }
    })
  }, [])

  const setName = useCallback((name) => setProfile((p) => ({ ...p, name })), [])
  const setAvatar = useCallback((avatar) => setProfile((p) => ({ ...p, avatar })), [])
  const reset = useCallback(() => setProfile(defaultProfile()), [])

  const value = useMemo(
    () => ({ profile, addStars, recordAnswer, setLessonStars, markDiscoverySeen, setName, setAvatar, reset }),
    [profile, addStars, recordAnswer, setLessonStars, markDiscoverySeen, setName, setAvatar, reset],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
