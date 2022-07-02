export default {
  setUser(state, user) {
    state.user = user;
  },
  updateUser(state, data) {
    for (const i in data) {
      state.user[i] = data[i];
    }
  },
  pushToCourseList(state, course) {
    state.user.course_list.push(course);
  },
  deleteFromCourseList(state, course) {
    state.user.course_list = state.user.course_list.filter(
      (c) => c.id != course.id
    );
  },
  pushToUnfinishedVideos(state, course) {
    state.user.unfinished_videos.push(course);
  },
  setLogged(state, logged) {
    state.logged = logged;
  },
  setMessages(state, messages) {
    state.messages = messages;
  },

  reset(state) {
    state.user = null;
    state.logged = false;
  },
};
