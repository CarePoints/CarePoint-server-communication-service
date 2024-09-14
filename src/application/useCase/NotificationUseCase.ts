import { Notifications } from "../../domain/entities/Notification";

export class NotificationUseCase {
  private notifications: Map<string, Notifications[]> = new Map();

  public sendNotification(roomId: string, message: string): Notifications {
    const notification = new Notifications(roomId, message);

    const notifications = this.notifications.get(roomId) || [];
    notifications.push(notification);
    this.notifications.set(roomId, notifications);

    return notification;
  }

  public getNotificationsForRoom(roomId: string): Notifications[] {
    return this.notifications.get(roomId) || [];
  }
  
  public getNotification(roomId: string, index: number): Notifications | undefined {
    const notifications = this.notifications.get(roomId);
    return notifications ? notifications[index] : undefined;
  }
}
