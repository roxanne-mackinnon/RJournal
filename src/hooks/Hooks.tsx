import {useRef} from 'react';
import { NoteController } from '../NoteController';

export function useNoteRequest() {
    let controller = useRef(new NoteController());
    return controller.current;
}

