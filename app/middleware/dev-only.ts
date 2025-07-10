export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.dev) return;
  return abortNavigation({
    statusCode: 404,
    statusMessage: "Not Found",
  });
});
