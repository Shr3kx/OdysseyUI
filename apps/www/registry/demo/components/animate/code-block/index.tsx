'use client';

import { CodeFrame } from '@/registry/components/animate/code-block';

interface CodeFrameDemoProps {
  typeEffect: boolean;
  duration: number;
  delay: number;
  theme: string;
  language: string;
}

const SNIPPETS: Record<string, string> = {
  python: `from contextlib import contextmanager
from typing import Generator

@contextmanager
def safe_file_operation(filepath: str, mode: str = 'r') -> Generator:
    """Context manager for safe file operations."""
    file = None
    try:
        file = open(filepath, mode)
        yield file
    except FileNotFoundError:
        print(f"File {filepath} not found")
        raise
    except IOError as e:
        print(f"IO error: {e}")
        raise
    finally:
        if file:
            file.close()

# Usage
with safe_file_operation('data.txt', 'r') as f:
    content = f.read()
    print(content)`,
  javascript: `import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;`,
  react: `'use client';
 
import * as React from 'react';
  
type MyComponentProps = {
  myProps: string;
} & React.ComponentProps<'div'>;
  
function MyComponent(props: MyComponentProps) {
  return (
    <div {...props}>
      <p>My Component</p>
    </div>
  );
}

export { MyComponent, type MyComponentProps };`,
  java: `import java.util.Optional;
import java.util.function.Function;

public class Either<L, R> {
    private final L left;
    private final R right;

    private Either(L left, R right) {
        this.left = left;
        this.right = right;
    }

    public static <L, R> Either<L, R> left(L value) {
        return new Either<>(value, null);
    }

    public static <L, R> Either<L, R> right(R value) {
        return new Either<>(null, value);
    }

    public boolean isRight() { return right != null; }

    public <T> T fold(Function<L, T> leftFn, Function<R, T> rightFn) {
        return isRight() ? rightFn.apply(right) : leftFn.apply(left);
    }
}`,
};

export const CodeFrameDemo = ({
  typeEffect,
  duration,
  delay,
  theme,
  language,
}: CodeFrameDemoProps) => {
  const code = SNIPPETS[language] ?? SNIPPETS['react'];
  return (
    <CodeFrame
      key={`${typeEffect}-${duration}-${delay}-${language}-${theme}`}
      code={code}
      language={language}
      typeEffect={typeEffect}
      duration={duration}
      delay={delay}
      theme={theme}
      className="w-125"
    />
  );
};
