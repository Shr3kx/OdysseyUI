import { CodeFrame } from '@/registry/components/animate/code-block';

const snippet_3 = {
  id: '3',
  title: 'Python Context Manager',
  description:
    'A custom context manager for file operations with error handling.',
  code: `from contextlib import contextmanager
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
  language: 'python',
  tags: ['python', 'context-manager', 'file-handling'],
  folder: 'Learning',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
export const CodeFrameDemo = () => {
  return <CodeFrame code={snippet_3.code} language="python" />;
};
