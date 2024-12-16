import { NextResponse } from 'next/server';
import supaBase from '../../../utils/supaBase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const lang = request.headers.get('lang') || 'en'; 

    const { data, error } = await supaBase
      .from('Blogs')
      .select(
        lang === 'ge'
          ? 'id,  Title_Ka, Description_Ka'
          : 'id,  Title, Description'
      )
      .eq('id', id); 

    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
