import { uid } from "~/utils";

const snitchr = () => {
  const sessionId = uid();
  const userId = localStorage.getItem("user_id");

  const log = [];
  return {
    snitch: (event, details) => {
      const meta = {
        event,
        details,
        timestamp: new Date().toISOString(),
        userId,
        sessionId
      };

      log.push(meta);
      console.log(meta);
    },
    log
  };
};

export default snitchr;
