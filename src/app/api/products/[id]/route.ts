import { NextResponse } from 'next/server';
import supaBase from '../../../utils/supaBase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const lang = request.headers.get('lang') || 'en'; 

    const { data, error } = await supaBase
      .from('Products')
      .select(
        lang === 'ge'
          ? 'id, Image, Title_Ka, Description_Ka, Price'
          : 'id, Image, Title, Description, Price'
      )
      .eq('id', id); 

    if (error || !data || data.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
