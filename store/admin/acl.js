export const getters = {
  isStaff (_, getters) {
    return [OWNER, MANAGER, MENTOR, DOCTOR, COOK].includes(getters.role)
  },
}
