class LocalCache {
  setItem(key: string, value: any, useSessionStorage?: boolean) {
    const storage = useSessionStorage ? sessionStorage : localStorage
    storage.setItem(key, JSON.stringify(value))
  }
  getItem(key: string, useSessionStorage?: boolean) {
    const storage = useSessionStorage ? sessionStorage : localStorage
    const value = storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeItem(key: string, useSessionStorage?: boolean) {
    const storage = useSessionStorage ? sessionStorage : localStorage
    storage.removeItem(key)
  }
}

export default new LocalCache()
