import faker from 'faker';
import Random from 'meteor-random';
import { MODULES } from '../data/constants';

import {
  Users,
  Integrations,
  Brands,
  EmailTemplates,
  ResponseTemplates,
  InternalNotes,
  Customers,
  ConversationMessages,
  Conversations,
  Tags,
  Segments,
  EngageMessages,
  Forms,
  Fields,
  Companies,
  NotificationConfigurations,
  Notifications,
  Channels,
} from './models';

export const userFactory = (params = {}) => {
  const user = new Users({
    username: params.username || faker.random.word(),
    details: {
      fullName: params.fullName || faker.random.word(),
    },
    emails: [
      {
        address: params.email || faker.internet.email(),
        verified: true,
      },
    ],
  });

  return user.save();
};

export const tagsFactory = (params = { type: 'engageMessage' }) => {
  const tag = new Tags({
    name: faker.random.word(),
    type: params.type || faker.random.word(),
    colorCode: params.colorCode || Random.id(),
    userId: Random.id(),
  });

  return tag.save();
};

export const engageMessageFactory = (params = {}) => {
  const engageMessage = new EngageMessages({
    kind: 'manual',
    method: 'messenger',
    title: faker.random.word(),
    fromUserId: params.userId || faker.random.word(),
    segmentId: params.segmentId || faker.random.word(),
    isLive: true,
    isDraft: false,
    messenger: {
      brandId: faker.random.word(),
      content: faker.random.word(),
    },
  });

  return engageMessage.save();
};

export const segmentsFactory = () => {
  const segment = new Segments({
    name: faker.random.word(),
  });

  return segment.save();
};

export const brandFactory = (params = {}) => {
  const brand = new Brands({
    name: faker.random.word(),
    code: params.code || faker.random.word(),
    userId: Random.id(),
    description: params.description || faker.random.word(),
    emailConfig: {
      type: 'simple',
      template: faker.random.word(),
    },
  });

  return brand.save();
};

export const emailTemplateFactory = (params = {}) => {
  const emailTemplate = new EmailTemplates({
    name: faker.random.word(),
    content: params.content || faker.random.word(),
  });

  return emailTemplate.save();
};

export const responseTemplateFactory = (params = {}) => {
  const responseTemplate = new ResponseTemplates({
    name: faker.random.word(),
    content: params.content || faker.random.word(),
    brandId: params.brandId || Random.id(),
    files: [faker.random.image()],
  });

  return responseTemplate.save();
};

export const segmentFactory = (params = {}) => {
  const defaultConditions = [
    {
      field: 'messengerData.sessionCount',
      operator: 'e',
      value: '10',
      dateUnit: 'days',
      type: 'string',
    },
  ];

  const segment = new Segments({
    name: faker.random.word(),
    description: params.description || faker.random.word(),
    subOf: params.subOf || 'DFSAFDFDSFDSF',
    color: params.color || '#ffff',
    connector: params.connector || 'any',
    conditions: params.conditions || defaultConditions,
  });

  return segment.save();
};

export const internalNoteFactory = (params = {}) => {
  const internalNote = new InternalNotes({
    contentType: params.contentType || 'customer',
    contentTypeId: params.contentTypeId || 'DFASFDFSDAFDF',
    content: params.content || faker.random.word(),
  });

  return internalNote.save();
};

export const companyFactory = (params = {}) => {
  const company = new Companies({
    name: params.name || faker.random.word(),
    size: params.size || faker.random.number(),
    industry: params.industry || Random.id(),
    website: params.website || Random.id(),
  });

  return company.save();
};

export const customerFactory = (params = {}) => {
  const customer = new Customers({
    name: params.name || faker.random.word(),
    email: params.email || faker.internet.email(),
    phone: params.phone || faker.random.word(),
    messengerData: params.messengerData || {},
    customFieldsData: params.customFieldsData || {},
  });

  return customer.save();
};

export const fieldFactory = (params = {}) => {
  const field = new Fields({
    contentType: params.contentType || 'form',
    contentTypeId: params.contentTypeId || 'DFAFDASFDASFDSFDASFASF',
    type: params.type || 'input',
    validation: params.validation || 'number',
    text: params.text || faker.random.word(),
    description: params.description || faker.random.word(),
    isRequired: params.isRequired || false,
    order: params.order || 0,
  });

  return field.save();
};

export const conversationFactory = (params = {}) => {
  const doc = {
    content: faker.lorem.sentence(),
    customerId: Random.id(),
    integrationId: Random.id(),
  };

  return Conversations.createConversation({
    ...doc,
    ...params,
  });
};

export const conversationMessageFactory = (params = {}) => {
  return ConversationMessages.createMessage({
    content: params.content || faker.random.word(),
    attachments: {},
    mentionedUserIds: params.mentionedUserIds || [Random.id()],
    conversationId: params.conversationId || Random.id(),
    internal: params.internal || true,
    customerId: params.customerId || Random.id(),
    userId: params.userId || Random.id(),
    createdAt: new Date(),
    isCustomerRead: params.isCustomerRead || true,
    engageData: params.engageData || {},
    formWidgetData: params.formWidgetData || {},
    facebookData: params.facebookData || {},
  });
};

export const integrationFactory = async (params = {}) => {
  const kind = params.kind || 'messenger';

  const doc = {
    name: faker.random.word(),
    kind,
    brandId: Random.id(),
    formId: Random.id(),
    messengerData: { welcomeMessage: 'welcome', notifyCustomer: true },
    facebookData: params.facebookData || {},
    formData:
      params.formData === 'form'
        ? params.formData
        : kind === 'form' ? { thankContent: 'thankContent' } : null,
  };

  return Integrations.create(doc);
};

export const formFactory = async ({ title, code, description, createdUserId }) => {
  return Forms.createForm(
    {
      title: title || faker.random.word(),
      description: description || faker.random.word(),
      code: code || Random.id(),
    },
    createdUserId || (await userFactory({})),
  );
};

export const notificationConfigurationFactory = params => {
  let { isAllowed } = params;
  if (isAllowed == null) {
    isAllowed = true;
  }

  return NotificationConfigurations.createOrUpdateConfiguration(
    {
      notifType: params.notifType || MODULES.CHANNEL_MEMBERS_CHANGE,
      // which module's type it is. For example: indocuments
      isAllowed,
    },
    params.user || userFactory({}),
  );
};

export const notificationFactory = params => {
  return Notifications.createNotification({
    notifType: params.notifType || MODULES.CHANNEL_MEMBERS_CHANGE,
    createdUser: params.createdUser || userFactory({}),
    title: params.title || 'new Notification title',
    content: params.content || 'new Notification content',
    link: params.link || 'new Notification link',
    receiver: params.receiver || userFactory({}),
  });
};

export async function channelFactory(params = {}) {
  const user = await userFactory({});

  const obj = Object.assign(
    {
      name: faker.random.word(),
      description: faker.lorem.sentence,
      integrationIds: [],
      memberIds: [user._id],
      userId: user._id,
      conversationCount: 0,
      openConversationCount: 0,
      createdAt: new Date(),
    },
    params,
  );

  return Channels.create(obj);
}
