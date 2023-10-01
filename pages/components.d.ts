import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedAbstractText extends Schema.Component {
  collectionName: 'components_shared_abstract_texts';
  info: {
    displayName: 'AbstractText';
  };
  attributes: {
    Body: Attribute.RichText;
  };
}

export interface SharedBlogContent extends Schema.Component {
  collectionName: 'components_shared_blog_contents';
  info: {
    displayName: 'BlogContent';
  };
  attributes: {};
}

export interface SharedContentTextImageInline extends Schema.Component {
  collectionName: 'components_shared_content_text_image_inlines';
  info: {
    displayName: 'ContentTextImageInline';
  };
  attributes: {
    Text: Attribute.RichText;
    Image: Attribute.Media;
    Position: Attribute.Enumeration<
      [
        'Top Left',
        'Top Center',
        'Top Right',
        'Middle Left',
        'Center',
        'Middle Right',
        'Bottom Left',
        'Bottom Center',
        'Bottom Right'
      ]
    >;
  };
}

export interface SharedContentTextOnly extends Schema.Component {
  collectionName: 'components_shared_content_text_onlies';
  info: {
    displayName: 'ContentTextOnly';
    description: '';
  };
  attributes: {
    Text: Attribute.RichText;
    AdvancedText: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbarBaloon';
        }
      >;
  };
}

export interface SharedImage extends Schema.Component {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'Image';
    description: '';
  };
  attributes: {
    Media: Attribute.Media;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedOurTeamCard extends Schema.Component {
  collectionName: 'components_shared_our_team_cards';
  info: {
    displayName: 'Our Team Card';
    description: '';
  };
  attributes: {
    Picture: Attribute.Media;
    FullName: Attribute.String;
    Position: Attribute.String;
    Description: Attribute.RichText;
    LinkedinLink: Attribute.String;
    GithubLink: Attribute.String;
    ResearchGateLink: Attribute.String;
    TwitterLink: Attribute.String;
    Email: Attribute.Email;
  };
}

export interface SharedProject extends Schema.Component {
  collectionName: 'components_shared_projects';
  info: {
    displayName: 'Project';
  };
  attributes: {
    Logo: Attribute.Media;
    Title: Attribute.String;
    LinkToProject: Attribute.String;
    DoiImage: Attribute.Media;
    DoiLink: Attribute.String;
  };
}

export interface SharedPublications extends Schema.Component {
  collectionName: 'components_shared_publications';
  info: {
    displayName: 'Publications';
  };
  attributes: {};
}

export interface SharedReadMoreLink extends Schema.Component {
  collectionName: 'components_shared_read_more_links';
  info: {
    displayName: 'ReadMoreLink';
  };
  attributes: {
    Text: Attribute.String & Attribute.DefaultTo<'Read more...'>;
    Link: Attribute.String;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media & Attribute.Required;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'shared.abstract-text': SharedAbstractText;
      'shared.blog-content': SharedBlogContent;
      'shared.content-text-image-inline': SharedContentTextImageInline;
      'shared.content-text-only': SharedContentTextOnly;
      'shared.image': SharedImage;
      'shared.meta-social': SharedMetaSocial;
      'shared.our-team-card': SharedOurTeamCard;
      'shared.project': SharedProject;
      'shared.publications': SharedPublications;
      'shared.read-more-link': SharedReadMoreLink;
      'shared.seo': SharedSeo;
    }
  }
}
