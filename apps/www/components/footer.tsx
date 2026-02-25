export const Footer = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto h-16">
        <div className="size-full px-4 md:px-6 flex items-center justify-center prose prose-sm text-sm text-foreground dark:text-muted-foreground ">
          <p className="text-start truncate">
            Built by{' '}
            <a
              href="https://x.com/shr3kxx"
              rel="noopener noreferrer"
              target="_blank"
            >
              Shr3kx
            </a>{' '}
            &{' '}
            <a
              href="https://x.com/ctrlcat0x"
              rel="noopener noreferrer"
              target="_blank"
            >
              iam-sahil
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/shr3kx/odysseyUI"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
