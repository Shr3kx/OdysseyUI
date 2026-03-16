import {
  ModelSelector,
  ModelSelectorTrigger,
  ModelSelectorModal,
  type Provider,
  type Model,
} from '@/registry/components/ai/model-selector';

const PROVIDERS: Provider[] = [
  {
    id: 'openai',
    icon: (
      <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 260">
        <path
          fill="currentColor"
          d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"
        />
      </svg>
    ),
    label: 'OpenAI',
  },
  {
    id: 'anthropic',
    icon: (
      <svg fillRule="evenodd" viewBox="0 0 24 24" fill="currentColor">
        <title>Anthropic</title>
        <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
      </svg>
    ),
    label: 'Anthropic',
  },
  {
    id: 'google',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    label: 'Google',
  },
];

const MODELS: Model[] = [
  {
    id: 'gpt-5.4',
    provider: 'openai',
    name: 'GPT-5.4',
    desc: "OpenAI's latest fast model for everyday chat",
    cost: '2x',
    tag: 'NEW',
    caps: ['vision', 'tools', 'search'],
    starred: true,
  },
  {
    id: 'claude-s-4.6',
    provider: 'anthropic',
    name: 'Claude Sonnet 4.6',
    desc: "Anthropic's latest Sonnet for real-world work",
    cost: '2x',
    tag: null,
    caps: ['vision', 'tools', 'search'],
    starred: true,
  },
  {
    id: 'gemini-3-flash',
    provider: 'google',
    name: 'Gemini 3 Flash',
    desc: 'Lightning-fast with surprising capability',
    cost: '0.5x',
    tag: null,
    caps: ['vision', 'tools', 'search'],
    starred: false,
  },
  {
    id: 'gemini-ultra',
    provider: 'google',
    name: 'Gemini Ultra 2',
    desc: "Google's most capable reasoning model",
    cost: '4x',
    tag: null,
    caps: ['vision', 'tools'],
    starred: false,
  },
  {
    id: 'gpt-5-mini',
    provider: 'openai',
    name: 'GPT-5 mini',
    desc: 'Affordable and intelligent small model for fast tasks',
    cost: '0.5x',
    tag: null,
    caps: ['vision', 'tools'],
    starred: false,
  },
  {
    id: 'nano-banana',
    provider: 'google',
    name: 'Nano Banana Pro',
    desc: 'Higher fidelity image generation built on Gemini',
    cost: '3x',
    tag: null,
    caps: ['vision'],
    starred: true,
  },
];

export const ModelSelectorDemo = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <ModelSelector
        providers={PROVIDERS}
        models={MODELS}
        defaultModel={MODELS[1]}
      >
        <ModelSelectorTrigger />
        <ModelSelectorModal />
      </ModelSelector>
    </div>
  );
};
