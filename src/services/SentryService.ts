import * as Sentry from "@sentry/browser";


export class SentryService {
    static init() {
        Sentry.init({
            dsn: "https://a19d6502b7978480a8480d4ab04c0fe4@o4504967558725632.ingest.us.sentry.io/4509831572750337",
            sendDefaultPii: true,
            integrations: [
                Sentry.browserTracingIntegration(),
            ],
            enableLogs: true,
            tracesSampleRate: 1.0,
            // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
            tracePropagationTargets: ["localhost", /^https:\/\/tondomino\.online/],
        });
    }

    static throwError(error: Error) {
        setTimeout(() => {
            throw error;
        });

    }
}