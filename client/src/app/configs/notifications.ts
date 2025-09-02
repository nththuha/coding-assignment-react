import { notifications } from "@mantine/notifications";

export enum NotificationType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export const ONE_SECOND = 1000;

const typeStyles: Record<
  NotificationType,
  { color: string; defaultMessage?: string }
> = {
  SUCCESS: {
    color: "var(--success)",
    defaultMessage: "Your changes have been saved",
  },
  ERROR: {
    color: "var(--error)",
    defaultMessage: "Unknown error",
  },
};

type PushNotificationProps = {
  message?: string;
  type?: NotificationType;
  autoClose?: number;
};

export function pushNotification({
  message,
  type = NotificationType.SUCCESS,
  autoClose = 3 * ONE_SECOND,
}: PushNotificationProps) {
  const { color, defaultMessage } = typeStyles[type];

  const _message = message || defaultMessage || "";

  notifications.show({
    message: _message,
    autoClose,
    withCloseButton: false,
    color,
  });
}
