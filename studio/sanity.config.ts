import i18n from '@repo/intl/index.json'
import {
  getFilteredDocumentTypeListItems,
  withDocumentI18nPlugin,
} from '@sanity/document-internationalization'
import { CogIcon, EditIcon, LockIcon } from '@sanity/icons'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { vercelProtectionBypassTool } from '@sanity/vercel-protection-bypass'

const STRUCTURE_CUSTOM_TYPES = ['settings', 'secrets']

console.log(
  'runtime',
  process.env.VERCEL_RELATED_PROJECTS,
  process.env.SANITY_STUDIO_VERCEL_RELATED_PROJECTS
)

const config = defineConfig({
  name: 'CV',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType === 'secrets') {
        return prev.filter(({ action }) => action !== 'duplicate')
      }
      if (schemaType === 'settings') {
        return prev.filter(
          ({ action }) => action !== 'unpublish' && action !== 'duplicate'
        )
      }

      return prev
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) =>
            templateItem.templateId !== 'settings' &&
            templateItem.templateId !== 'secrets'
        )
      }

      return prev
    },
  },
  plugins: withDocumentI18nPlugin(
    (pluginConfig) => [
      presentationTool({
        previewUrl: {
          preview: '/',
          previewMode: {
            enable: '/api/preview',
            disable: '/api/exit-preview',
          },
        },
      }),
      structureTool({
        structure: (S, { schema }) => {
          // The `Settings` root list item
          const settingsListItem = S.listItem()
            .title('Settings')
            .icon(CogIcon)
            .child(
              S.document()
                .schemaType('settings')
                .documentId('settings')
                .views([
                  S.view.form().icon(EditIcon),
                  // S.view
                  //   .component(SocialMediaCardPreview)
                  //   .icon(UserIcon)
                  //   .title('Social preview'),
                ])
            )
          // Like Settings but private, prefixing with `private.` ensures it can't be queried unless by an authenticated user with access to the dataset, like drafts
          const secretsListItem = S.listItem()
            .title('Secrets')
            .icon(LockIcon)
            .child(
              S.document()
                .id('secrets')
                .schemaType('secrets')
                .documentId('private.secrets')
                .title('Secret title')
            )

          // The default root list items (except custom ones)
          const defaultListItems = getFilteredDocumentTypeListItems({
            S,
            schema,
            config: pluginConfig,
          }).filter((listItem) => !STRUCTURE_CUSTOM_TYPES.includes(listItem.id))

          return S.list()
            .title('Content')
            .items([
              settingsListItem,
              secretsListItem,
              S.divider(),
              ...defaultListItems,
            ])
        },
        // defaultDocumentNode: (S, { schemaType, documentId }) => {
        //   if (schemaType === 'settings') {
        //     return S.document().views([
        //       S.view.form().icon(EditIcon),
        //       S.view
        //         .component(SocialMediaCardPreview)
        //         .icon(UserIcon)
        //         .title('Social preview'),
        //     ])
        //   }
        // },
      }),
      vercelProtectionBypassTool(),
    ],
    {
      includeDeskTool: false,
      base: i18n.defaultLocale,
      languages: i18n.locales,
    }
  ),
  schema: {
    types: [
      {
        title: 'Settings',
        name: 'settings',
        type: 'document',
        i18n: true,
        preview: { prepare: () => ({ title: 'Settings' }) },
        fields: [
          {
            title: 'Profile',
            name: 'profile',
            type: 'object',
            fields: [
              {
                title: 'Name',
                name: 'name',
                type: 'string',
              },
              {
                title: 'Role',
                name: 'role',
                type: 'string',
              },
              {
                title: 'Pronouns',
                name: 'pronouns',
                type: 'string',
              },
              {
                title: 'Country',
                name: 'country',
                type: 'string',
              },
            ],
          },
          {
            title: 'Social',
            name: 'social',
            type: 'object',
            description:
              'Stand out from the crowd of CV links by adding a beatiful image with a brief summary of your profile',
            fields: [
              {
                title: 'Mode',
                name: 'mode',
                type: 'string',
                initialValue: 'auto',
                options: {
                  list: [
                    { title: 'Auto', value: 'auto' },
                    { title: 'Manual', value: 'manual' },
                  ],
                  layout: 'radio',
                  direction: 'horizontal',
                },
              },
              {
                title: 'Headshot',
                name: 'headshot',
                type: 'image',
                hidden: ({ document }) =>
                  (document?.social as any)?.mode === 'manual',
                options: {
                  // Save some resources by not processing the image as we know we won't be using blurhash or lqip
                  //https://www.sanity.io/docs/image-metadata
                  metadata: ['palette'],
                  hotspot: true,
                  // Only care about excluding SVG tbh, but since input[type="file"].accept only lets us specify an allowlist it's necessary to best-guess
                  accept: ['image/jpeg', 'image/png'],
                },
              },
              {
                title: 'Eyebrow',
                name: 'eyebrow',
                type: 'string',
                hidden: ({ document }) =>
                  (document?.social as any)?.mode === 'manual',
              },
              {
                title: 'Name',
                name: 'name',
                type: 'string',
                hidden: ({ document }) =>
                  (document?.social as any)?.mode === 'manual',
              },
              {
                title: 'Pronouns',
                name: 'pronouns',
                type: 'string',
                hidden: ({ document }) =>
                  (document?.social as any)?.mode === 'manual',
              },
              {
                title: 'Role',
                name: 'role',
                type: 'string',
                hidden: ({ document }) =>
                  (document?.social as any)?.mode === 'manual',
              },
              {
                title: 'Image',
                name: 'image',
                type: 'image',
                options: {
                  // gc uses specific filenames, this option allows manually testing the gc manually
                  storeOriginalFilename: true,
                  // Save some resources by not processing the image as we know we won't be using blurhash or lqip
                  //https://www.sanity.io/docs/image-metadata
                  metadata: ['palette'],
                  hotspot: true,
                  // Only care about excluding SVG tbh, but since input[type="file"].accept only lets us specify an allowlist it's necessary to best-guess
                  accept: ['image/jpeg', 'image/png'],
                },
                fields: [
                  {
                    title: 'Alt text',
                    name: 'alt',
                    type: 'text',
                    rows: 2,
                  },
                  // eyebrow, name, pronouns and role are duplicated here to keep track of when the graphic needs to be recreated whenever something is edited
                  {
                    title: 'auto.headshot',
                    name: 'headshot',
                    type: 'string',
                    hidden: true,
                    readOnly: ({ document }) =>
                      (document?.social as any)?.mode === 'manual',
                  },
                  {
                    title: 'auto.eyebrow',
                    name: 'eyebrow',
                    type: 'string',
                    hidden: true,
                    readOnly: ({ document }) =>
                      (document?.social as any)?.mode === 'manual',
                  },
                  {
                    title: 'auto.name',
                    name: 'name',
                    type: 'string',
                    hidden: true,
                    readOnly: ({ document }) =>
                      (document?.social as any)?.mode === 'manual',
                  },
                  {
                    title: 'auto.pronouns',
                    name: 'pronouns',
                    type: 'string',
                    hidden: true,
                    readOnly: ({ document }) =>
                      (document?.social as any)?.mode === 'manual',
                  },
                  {
                    title: 'auto.role',
                    name: 'role',
                    type: 'string',
                    hidden: true,
                    readOnly: ({ document }) =>
                      (document?.social as any)?.mode === 'manual',
                  },
                ],
                // @TODO figure out how to type this
                hidden: ({ document }) => !(document?.social as any)?.mode,
                readOnly: ({ document }) =>
                  (document?.social as any)?.mode === 'auto',
              },
            ],
          },
          {
            title: 'Labels',
            name: 'label',
            description:
              "Translate UI text, don't put content here, unless you really want to!",
            type: 'object',
            fields: [
              {
                title: 'Address',
                name: 'address',
                type: 'string',
              },
              {
                title: 'Email',
                name: 'email',
                type: 'string',
              },
              {
                title: 'Phone',
                name: 'phone',
                type: 'string',
              },
              {
                title: 'About',
                name: 'about',
                type: 'string',
              },
              {
                title: 'Print',
                name: 'print',
                type: 'string',
              },
              {
                title: 'Latest',
                name: 'latest',
                type: 'string',
              },
            ],
          },
          {
            title: 'Meta',
            name: 'meta',
            type: 'object',
            fields: [
              {
                title: 'Title',
                name: 'title',
                type: 'string',
              },
              {
                title: 'Description',
                name: 'description',
                type: 'string',
              },
              {
                title: 'Twitter',
                name: 'twitter',
                type: 'string',
                description: 'Just the @username, not the URL',
                // @TODO validate if the handle is prefixed with @
              },
            ],
          },
        ],
      },
      {
        title: 'Secrets',
        name: 'secrets',
        type: 'document',
        preview: { prepare: () => ({ title: 'Secrets' }) },
        fields: [
          {
            title: 'Hello',
            name: 'hello',
            type: 'string',
            description: 'Publish this to anything but "Edge"',
          },
        ],
      },
      {
        title: 'Company',
        name: 'company',
        type: 'document',
        fields: [
          {
            title: 'Name',
            name: 'name',
            type: 'string',
          },
          {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: { source: 'name' },
          },
          {
            title: 'LinkedIn',
            name: 'linkedin',
            type: 'url',
          },
          {
            title: 'Logo',
            name: 'logo',
            type: 'image',
            description:
              'The logo will need render in a timeline that uses a CSS drop-shadow effect to create a white outline. Thus the opacity of the logo must be deliberate in order for it to look great. And generally square logos look better.',
            options: { hotspot: true },
          },
        ],
      },
      {
        title: 'Experience',
        name: 'experience',
        type: 'document',
        fields: [
          {
            title: 'Role',
            name: 'role',
            type: 'string',
          },
          {
            title: 'Company',
            name: 'company',
            type: 'reference',
            to: [{ type: 'company' }],
          },
          {
            title: 'Joined',
            name: 'joined',
            type: 'date',
          },
          {
            title: 'Left',
            name: 'left',
            type: 'date',
          },
          {
            title: 'Location',
            name: 'location',
            type: 'string',
          },
          {
            title: 'Flag',
            name: 'flag',
            type: 'string',
          },
          {
            title: 'Map URL',
            name: 'mapUrl',
            type: 'url',
          },
          {
            title: 'Remote Work',
            name: 'remote',
            type: 'boolean',
          },
        ],
        initialValue: {
          remote: false,
        },
      },
      {
        title: 'Education',
        name: 'education',
        type: 'document',
        fields: [
          {
            title: 'School',
            name: 'school',
            type: 'string',
          },
          {
            title: 'Degree',
            name: 'degree',
            type: 'string',
          },
          {
            title: 'Field of study',
            name: 'field',
            type: 'string',
          },
          {
            title: 'Start date',
            name: 'start',
            type: 'date',
            options: { dateFormat: 'YYYY' },
          },
          {
            title: 'End date',
            name: 'end',
            type: 'date',
            options: { dateFormat: 'YYYY' },
          },
        ],
      },
    ],
  },
})

export default config
