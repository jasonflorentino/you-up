export const initialState = {
  friends: [],
  wakeTime: [7, 0],
  sleepTime: [23, 0],
};

export const SET_LOCAL_OFFSET = 1;
export const LOAD_STATE = 2;
export const ADD_NEW_FRIEND = 3;
export const REMOVE_FRIEND = 4;
export const EDIT_FRIEND = 5;
export const SET_AWAKETIMES = 6;
export const actions = {
  SET_LOCAL_OFFSET,
  LOAD_STATE,
  ADD_NEW_FRIEND,
  REMOVE_FRIEND,
  EDIT_FRIEND,
  SET_AWAKETIMES,
};

const isDev =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
  process.env.VERCEL_ENV === "development";

export const reducer = (state, action) => {
  if (isDev) {
    console.groupCollapsed(getActionFromEnum(action.type));
    console.log("ACTION", action);
    console.log("CURRENT_STATE", state);
    console.groupEnd(getActionFromEnum(action.type));
  }

  switch (action.type) {
    case LOAD_STATE:
      return {
        ...initialState,
        ...action.payload,
      };
    case SET_LOCAL_OFFSET:
      return {
        ...state,
        localOffset: action.payload.localOffset,
      };
    case ADD_NEW_FRIEND: {
      const { name, timezone } = action.payload;
      const newFriend = {
        id: makeFriendId(state.friends.length),
        timezone,
        name,
      };
      return {
        ...state,
        friends: [newFriend, ...state.friends],
      };
    }
    case REMOVE_FRIEND: {
      const { id } = action.payload;
      return {
        ...state,
        friends: state.friends.filter((friend) => friend.id !== id),
      };
    }
    case EDIT_FRIEND: {
      const { id, name, timezone } = action.payload;
      const friendToEdit = state.friends.find((friend) => friend.id === id);
      const editedFriend = {
        ...friendToEdit,
        name,
        timezone,
      };
      return {
        ...state,
        friends: state.friends.map((friend) =>
          friend.id === id ? editedFriend : friend
        ),
      };
    }
    case SET_AWAKETIMES: {
      const { wakeTime, sleepTime } = action.payload;
      return {
        ...state,
        wakeTime,
        sleepTime,
      };
    }
    default:
      throw new Error();
  }
};

function getActionFromEnum(num) {
  const entry = Object.entries(actions).find(([_name, id]) => id === num) || [];
  return entry[0];
}

function makeFriendId(salt = "") {
  return "f" + Date.now() + "-" + salt;
}
