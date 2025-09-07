import { Meta, StoryObj } from '@storybook/angular';
import { Attribute } from 'keycloakify/login';
import { decorators, KcPageStory } from '../../KcPageStory';

const meta: Meta<KcPageStory> = {
  title: 'login/register.ftl',
  component: KcPageStory,
  decorators: decorators,
  globals: {
    pageId: 'register.ftl',
  },
};

export default meta;

type Story = StoryObj<KcPageStory>;

export const Default: Story = {};

export const WithEmailAlreadyExists: Story = {
  globals: {
    kcContext: {
      messagesPerField: {
        existsError: (fieldName: string, ...otherFieldNames: string[]) =>
          [fieldName, ...otherFieldNames].includes('email'),
        get: (fieldName: string) => (fieldName === 'email' ? 'Email already exists.' : ''),
      },
    },
  },
};

export const WithRestrictedToMITStudents: Story = {
  globals: {
    kcContext: {
      'x-keycloakify': {
        messages: {
          'profile.attributes.email.inputHelperTextBefore': 'Please use your MIT or Berkeley email.',
          'profile.attributes.email.pattern.error':
            'This is not an MIT (<strong>@mit.edu</strong>) nor a Berkeley (<strong>@berkeley.edu</strong>) email.',
        },
      },
    },
  },
};

export const WithFavoritePet: Story = {
  globals: {
    kcContext: {
      profile: {
        attributesByName: {
          favoritePet: {
            name: 'favorite-pet',
            displayName: '${profile.attributes.favoritePet}',
            validators: {
              options: {
                options: ['cat', 'dog', 'fish'],
              },
            },
            annotations: {
              inputOptionLabelsI18nPrefix: 'profile.attributes.favoritePet.options',
            },
            required: false,
            readOnly: false,
          } satisfies Attribute,
        },
      },
      'x-keycloakify': {
        messages: {
          'profile.attributes.favoritePet': 'Favorite Pet',
          'profile.attributes.favoritePet.options.cat': 'Fluffy Cat',
          'profile.attributes.favoritePet.options.dog': 'Loyal Dog',
          'profile.attributes.favoritePet.options.fish': 'Peaceful Fish',
        },
      },
    },
  },
};

export const WithInputTagSelects: Story = {
  globals: {
    kcContext: {
      profile: {
        attributesByName: {
          skills: {
            name: 'skills',
            displayName: 'Technical Skills',
            annotations: {
              inputType: 'input-tag-selects',
              inputOptionLabels: {
                javascript: 'JavaScript',
                typescript: 'TypeScript',
                angular: 'Angular',
                react: 'React',
                vue: 'Vue.js',
                nodejs: 'Node.js',
                python: 'Python',
                java: 'Java',
              },
            },
            validators: {
              options: {
                options: ['javascript', 'typescript', 'angular', 'react', 'vue', 'nodejs', 'python', 'java'],
              },
            },
            multivalued: true,
            values: ['javascript', 'angular'],
            required: false,
            readOnly: false,
          } satisfies Attribute,
        },
      },
      'x-keycloakify': {
        messages: {
          'profile.attributes.skills': 'Technical Skills',
        },
      },
    },
  },
};

export const WithNewsletter: Story = {
  globals: {
    kcContext: {
      profile: {
        attributesByName: {
          newsletter: {
            name: 'newsletter',
            displayName: 'Sign up to the newsletter',
            validators: {
              options: {
                options: ['yes'],
              },
            },
            annotations: {
              inputOptionLabels: {
                yes: 'I want my email inbox filled with spam',
              },
              inputType: 'multiselect-checkboxes',
            },
            required: false,
            readOnly: false,
          } satisfies Attribute,
        },
      },
    },
  },
};

export const WithTextareaTag: Story = {
  globals: {
    kcContext: {
      profile: {
        attributesByName: {
          biography: {
            name: 'biography',
            displayName: 'Biography',
            annotations: {
              inputType: 'textarea',
              inputTypeRows: '5',
              inputTypeCols: '50',
              inputTypeMaxlength: '500',
              inputTypePlaceholder: 'Tell us about yourself...',
              inputHelperTextBefore: 'Please provide a brief description of your background.',
              inputHelperTextAfter: 'Maximum 500 characters.',
            },
            value: 'Software developer with 5+ years of experience...',
            required: true,
            readOnly: false,
            validators: {
              length: undefined,
              integer: undefined,
              email: undefined,
              pattern: undefined,
              options: undefined,
              multivalued: undefined,
            },
          } satisfies Attribute,
        },
      },
    },
  },
};

export const WithGroupLabel: Story = {
  globals: {
    kcContext: {
      profile: {
        attributesByName: {
          personalInfo: {
            name: 'personal-info',
            displayName: 'Personal Information',
            group: {
              name: 'personal-details',
              displayHeader: 'Personal Details',
              displayDescription: 'Please provide your personal information below.',
              annotations: {
                'data-section': 'personal',
              },
              html5DataAnnotations: {
                'data-group-id': 'personal-info-group',
              },
            },
            annotations: {
              inputType: 'text',
            },
            required: false,
            readOnly: false,
            validators: {
              length: undefined,
              integer: undefined,
              email: undefined,
              pattern: undefined,
              options: undefined,
              multivalued: undefined,
            },
          } satisfies Attribute,
          address: {
            name: 'address',
            displayName: 'Address',
            group: {
              name: 'personal-details',
              displayHeader: 'Personal Details',
              displayDescription: 'Please provide your personal information below.',
              annotations: {
                'data-section': 'personal',
              },
              html5DataAnnotations: {
                'data-group-id': 'personal-info-group',
              },
            },
            annotations: {
              inputType: 'textarea',
              inputTypeRows: '3',
            },
            required: false,
            readOnly: false,
            validators: {
              length: undefined,
              integer: undefined,
              email: undefined,
              pattern: undefined,
              options: undefined,
              multivalued: undefined,
            },
          } satisfies Attribute,
        },
      },
    },
  },
};

export const WithEmailAsUsername: Story = {
  globals: {
    kcContext: {
      realm: {
        registrationEmailAsUsername: true,
      },
      profile: {
        attributesByName: {
          username: undefined,
        },
      },
    },
  },
};

export const WithRecaptcha: Story = {
  globals: {
    kcContext: {
      scripts: ['https://www.google.com/recaptcha/api.js?hl=en'],
      recaptchaRequired: true,
      recaptchaSiteKey: '6LfQHvApAAAAAE73SYTd5vS0lB1Xr7zdiQ-6iBVa',
    },
  },
};

export const WithRecaptchaFrench: Story = {
  globals: {
    kcContext: {
      locale: {
        currentLanguageTag: 'fr',
      },
      scripts: ['https://www.google.com/recaptcha/api.js?hl=fr'],
      recaptchaRequired: true,
      recaptchaSiteKey: '6LfQHvApAAAAAE73SYTd5vS0lB1Xr7zdiQ-6iBVa',
    },
  },
};

export const WithPasswordMinLength8: Story = {
  globals: {
    kcContext: {
      passwordPolicies: {
        length: 8,
      },
    },
  },
};

export const WithTermsAcceptance: Story = {
  globals: {
    kcContext: {
      termsAcceptanceRequired: true,
      'x-keycloakify': {
        messages: {
          termsText: "<a href='https://example.com/terms'>Service Terms of Use</a>",
        },
      },
    },
  },
};

export const WithTermsNotAccepted: Story = {
  globals: {
    kcContext: {
      termsAcceptanceRequired: true,
      messagesPerField: {
        existsError: (fieldName: string) => fieldName === 'termsAccepted',
        get: (fieldName: string) => (fieldName === 'termsAccepted' ? 'You must accept the terms.' : ''),
      },
    },
  },
};

export const WithFieldErrors: Story = {
  globals: {
    kcContext: {
      profile: {
        attributesByName: {
          username: { value: '' },
          email: { value: 'invalid-email' },
        },
      },
      messagesPerField: {
        existsError: (fieldName: string) => ['username', 'email'].includes(fieldName),
        get: (fieldName: string) => {
          if (fieldName === 'username') return 'Username is required.';
          if (fieldName === 'email') return 'Invalid email format.';
          return '';
        },
      },
    },
  },
};

export const WithReadOnlyFields: Story = {
  globals: {
    kcContext: {
      profile: {
        attributesByName: {
          username: { value: 'johndoe', readOnly: true },
          email: { value: 'jhon.doe@gmail.com', readOnly: false },
        },
      },
    },
  },
};

export const WithAutoGeneratedUsername: Story = {
  globals: {
    kcContext: {
      profile: {
        attributesByName: {
          username: { value: 'autogenerated_username' },
        },
      },
    },
  },
};
