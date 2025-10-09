export enum MetricaEvents {
    SOFT_TABLE = "SOFT_TABLE",
    HARD_TABLE = "HARD_TABLE",
    APP_START = "APP_START",
    APP_LOADED = "APP_LOADED",
    OPEN_DEPOSIT = "OPEN_DEPOSIT",
    OPEN_WITHDRAW = "OPEN_WITHDRAW",
    OPEN_HISTORY = "OPEN_HISTORY",
    OPEN_PROFILE_EDITOR = "OPEN_PROFILE_EDITOR",
    OPEN_SETTINGS = "OPEN_SETTINGS",
}

export class MetricaService {
    private static yandexMetricaID = 104253554;

    static sendEvent(event: MetricaEvents, order_price?: string) {
        const params: (string | number | Object)[] = [MetricaService.yandexMetricaID, 'reachGoal', event];
        order_price && params.push({order_price, currency: "USD"});

        window.ym && window.ym(...params);
    }

}