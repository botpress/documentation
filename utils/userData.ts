import UserAgent from "user-agents";

export function getUserData() {
  const userAgent = new UserAgent();

  return {
    url: document.URL,
    browser: userAgent.data,
  }
}
