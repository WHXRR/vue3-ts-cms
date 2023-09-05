class LocalCache {
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getItem(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeItem(key: string) {
    localStorage.removeItem(key)
  }
}

export default new LocalCache()
