export const INTENT = {
  TASKS: {
    all: 'tasks',
    addMember: () => INTENT.TASKS.all.concat('/add-member'),
    removeMember: () => INTENT.TASKS.all.concat('/remove-member'),
  },
};
