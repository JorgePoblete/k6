import http from 'k6/http';
import { check, sleep } from 'k6';

const HOST = "https://test-api.k6.io/public/crocodiles/";
const SLEEP_TIME_SECONDS = 0.001;

export const options = {
    discardResponseBodies: true,
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    paused: false,
    scenarios: {
        basic: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 60,
            maxVUs: 500,
            startRate: 1,
            timeUnit: '1s',
            exec: 'api',
            stages: [
                { duration: '10s', target: 10 },
                { duration: '50s', target: 10 },

                { duration: '10s', target: 20 },
                { duration: '50s', target: 20 },
                
                { duration: '10s', target: 30 },
                { duration: '50s', target: 30 },
                
                { duration: '10s', target: 40 },
                { duration: '50s', target: 40 },
                
                { duration: '10s', target: 50 },
                { duration: '50s', target: 50 },
                
                { duration: '10s', target: 60 },
                { duration: '50s', target: 60 },

                { duration: '10s', target: 70 },
                { duration: '50s', target: 70 },

                { duration: '10s', target: 80 },
                { duration: '50s', target: 80 },

                { duration: '10s', target: 90 },
                { duration: '50s', target: 90 },

                { duration: '10s', target: 100 },
                { duration: '50s', target: 100 },
            ],
        },
    }
};

export function api() {
    let res = http.get(`${HOST}`);
    check(res, { 'status was 20': (r) => r.status == 20 });
    sleep(SLEEP_TIME_SECONDS);
}