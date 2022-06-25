import { match } from "node-match-path";

async function triggerEvent(event) {
  // Fetch some data
  console.log("cron processed", event.scheduledTime);
}

interface IEnv {
  MAP_REQUEST_DURABLE_WORKER: DurableObjectNamespace;
  TM_TRACKER: KVNamespace;
}

const worker = {
  fetch(request: Request, env: IEnv) {
    const url = new URL(request.url);

    const matchScoresByCountry = match(
      "/map/:map_id/scores_by_country/:country_code",
      url.pathname
    );

    if (matchScoresByCountry.matches) {
      const { map_id, country_code } = matchScoresByCountry.params;

      const requestKey = `totd::scores_by_country::${map_id}::${country_code}`;
      console.info(requestKey);

      const mapRequestId = env.MAP_REQUEST_DURABLE_WORKER.idFromName(
        `totd::scores_by_country::${map_id}::${country_code}`
      );

      return env.MAP_REQUEST_DURABLE_WORKER.get(mapRequestId).fetch(request);

      /*return new Response(
        `Should be looking at map(${map_id}) for scores by country code: ${country_code}`
      );*/
    }

    return new Response("hi");
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(triggerEvent(event));
  },
};

export class MapScoreRequestDurableWorker implements DurableObject {
  state: DurableObjectState;

  constructor(state: DurableObjectState, env) {
    this.state = state;
  }

  async fetch(request: Request) {
    let value = (await this.state.storage.get("current_offset")) || 0;
    let is_running = ((await this.state.storage.get("is_running")) || 0) !== 0;

    let ip = request.headers.get("CF-Connecting-IP");
    let data = await request.text();
    let storagePromise = this.state.storage.put(ip, data);
    await storagePromise;
    return new Response(ip + " stored " + data);
  }
}

export default worker;
