// hooks/useCustomCursor.ts
import { useEffect } from 'react'

export const useCustomCursor = (): void => {
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'custom-cursor-styles'
    style.innerHTML = `
      /* Pointer cursor for EVERYTHING by default */
      *, *:hover, *:active, *:focus {
        cursor: url('/cursors/pointer.png') 12 12, auto !important;
      }
      
      /* Flipper cursor only for drag-specific classes */
      .cursor-grab,
      .md\\:cursor-grab {
        cursor: url('/cursors/flipper.svg') 16 16, grab !important;
      }
      
      .cursor-grabbing,
      .active\\:cursor-grabbing:active,
      .opacity-40 { /* Your dragging state */
        cursor: url('/cursors/flipper.svg') 16 16, grabbing !important;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      const existingStyle = document.getElementById('custom-cursor-styles')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [])
}