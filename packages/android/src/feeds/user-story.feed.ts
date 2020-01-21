import { injectable } from 'tsyringe';
import { AndroidHttp } from '../core/android.http';

import { Feed } from '@igpapi/core';
import { UserStoryFeedResponseItemsItem, UserStoryFeedResponseRootObject } from '@igpapi/android';
import { AndroidState } from '../core/android.state';

@injectable()
export class UserStoryFeed extends Feed<UserStoryFeedResponseRootObject, UserStoryFeedResponseItemsItem> {
  userId: string | number;

  constructor(private http: AndroidHttp, private clientState: AndroidState) {
    super();
  }

  set state(response: any) {}

  items(raw: UserStoryFeedResponseRootObject) {
    return raw.reel.items;
  }

  async request(): Promise<UserStoryFeedResponseRootObject> {
    const { body } = await this.http.send({
      url: `/api/v1/feed/user/${this.userId}/story/`,
      method: 'GET',
      qs: {
        supported_capabilities_new: JSON.stringify(this.clientState.supportedCapabilities),
      },
    });
    return body;
  }
}
