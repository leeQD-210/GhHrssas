import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TimeStampKey = 'geoharbour-TimeStamp'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(TimeStampKey)
}
export function setTimeStamp() {
  return Cookies.set(TimeStampKey, Date.now())
}

export function removeTimeStamp() {
  return Cookies.remove(TimeStampKey)
}
