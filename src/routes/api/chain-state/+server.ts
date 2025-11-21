import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/storage';

export const GET: RequestHandler = async ({ url }) => {
  const chainId = url.searchParams.get('chainId');
  
  if (!chainId) {
    return json({ error: 'chainId required' }, { status: 400 });
  }
  
  try {
    const states = await db.chainState.getByChainId(chainId);
    states.sort((a, b) => a.dayNumber - b.dayNumber);
    
    // Konvertiere in ein einfaches Objekt pro Tag
    const stateMap: Record<number, any> = {};
    for (const state of states) {
      stateMap[state.dayNumber] = {
        chosenColor: state.chosenColor,
        chosenTheme: state.chosenTheme,
        chosenElement: state.chosenElement,
        textInput: state.textInput,
        stateData: state.stateData ? JSON.parse(state.stateData) : null
      };
    }
    
    return json({ success: true, states: stateMap });
  } catch (error) {
    console.error('Error fetching chain state:', error);
    return json({ error: 'Failed to fetch state' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const { storyChainId, dayNumber, chosenColor, chosenTheme, chosenElement, textInput, stateData } = data;
    
    if (!storyChainId || !dayNumber) {
      return json({ error: 'storyChainId and dayNumber required' }, { status: 400 });
    }
    
    // Upsert: Update wenn existiert, sonst erstelle neu
    const state = await db.chainState.upsert(storyChainId, parseInt(dayNumber), {
        chosenColor: chosenColor || null,
        chosenTheme: chosenTheme || null,
        chosenElement: chosenElement || null,
        textInput: textInput || null,
        stateData: stateData ? JSON.stringify(stateData) : null
    });
    
    return json({ success: true, state });
  } catch (error) {
    console.error('Error saving chain state:', error);
    return json({ error: 'Failed to save state' }, { status: 500 });
  }
};
