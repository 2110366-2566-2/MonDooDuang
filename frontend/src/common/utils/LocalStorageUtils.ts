export const LocalStorageUtils = {
  setData: (key: string, data: string) => {
    localStorage.setItem(key, data)
  },
  removeData: (key: string) => {
    localStorage.removeItem(key)
  },
  getData: (key: string) => {
    return localStorage.getItem(key)
  }
}
