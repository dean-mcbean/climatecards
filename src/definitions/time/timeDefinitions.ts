export type DailyScheduleItem = {callback: () => void, ticksTillNextTrigger: number, ticksBetweenTriggers: number};

export type DailySchedule = { [id: number] : DailyScheduleItem };