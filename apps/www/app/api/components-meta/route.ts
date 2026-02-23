import { NextResponse } from 'next/server';
import metaData from '@/content/docs/components/meta.json';
import templatesMetaData from '@/content/docs/templates/meta.json';

export async function GET() {
  return NextResponse.json({
    ...metaData,
    templatePages: templatesMetaData.pages,
  });
}
