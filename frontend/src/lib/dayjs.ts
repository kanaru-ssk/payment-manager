"use client";

import dayjs, { extend } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

extend(utc);
extend(timezone);

/**
 * 日時をYYYY/MM/DD HH:mm形式にフォーマットする。
 *
 * @param date 対象の日時
 */
export function formatDatetime(date: dayjs.ConfigType): string {
  return dayjs(date).tz(dayjs.tz.guess()).format("YYYY/MM/DD HH:mm");
}
