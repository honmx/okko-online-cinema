import notificationSlice, { addNotification, deleteNotification, initialState } from "../slices/notificationSlice";

describe("", () => {

  test("setting notification", () => {
    const action = {
      type: addNotification.type,
      payload: {
        text: "This is the notification"
      },
    }

    const result = notificationSlice(initialState, action);

    expect(result).toHaveProperty("notifications", [{ id: result.notifications[0].id, text: action.payload.text }]);
  });

  test("setting and deleting notification", () => {
    const setAction = {
      type: addNotification.type,
      payload: {
        text: "This is the notification"
      },
    }

    const settingResult = notificationSlice(initialState, setAction);
    expect(settingResult).toHaveProperty("notifications", [{ id: settingResult.notifications[0].id, ...setAction.payload }]);

    const deleteAction = {
      type: deleteNotification.type,
      payload: settingResult.notifications[0].id
    }

    const deletingResult = notificationSlice(initialState, deleteAction);
    expect(deletingResult).toHaveProperty("notifications", []);
  });
})