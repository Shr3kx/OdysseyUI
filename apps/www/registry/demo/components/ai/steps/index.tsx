import { FileSearch } from 'lucide-react';
import {
  Steps,
  StepsTrigger,
  StepsContent,
  StepsBar,
  StepsItem,
} from '@/registry/components/ai/steps';

export const StepsDemo = () => {
  return (
    <div className="w-full max-w-sm p-4">
      <Steps defaultOpen>
        <StepsTrigger leftIcon={<FileSearch className="size-4" />}>
          Tool run: analyze repo
        </StepsTrigger>
        <StepsContent bar={<StepsBar className="mr-2 ml-1.5" />}>
          <div className="space-y-1">
            <StepsItem>
              Cloning repository <strong>odyssey-ui/www</strong>
            </StepsItem>
            <StepsItem>
              Detected <strong>TypeScript</strong> +{' '}
              <strong>Tailwind CSS</strong>
            </StepsItem>
            <StepsItem>Found 142 components across 6 packages</StepsItem>
            <StepsItem>Dependency graph resolved in 280ms</StepsItem>
          </div>
        </StepsContent>
      </Steps>
    </div>
  );
};
