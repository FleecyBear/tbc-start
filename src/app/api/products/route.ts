import { NextResponse } from 'next/server';
import supaBase from '../../utils/supaBase';

export async function GET(request: Request) {
  try {
    const lang = request.headers.get('lang') || 'en';

    const selectFields = lang === 'ge'
      ? 'id, Image, Title_Ka, Description_Ka, Price'
      : 'id, Image, Title, Description, Price';

    const { data, error } = await supaBase.from('Products').select(selectFields);

    if (error) {
      return NextResponse.json({ error: `Error fetching products: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
