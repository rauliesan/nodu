import React from 'react';
import { ParsonsOrderExercise } from '../../types/course';

interface ParsonsOrderRendererProps {
  exercise: ParsonsOrderExercise;
  currentOrder: string[];
  onChangeOrder: (order: string[]) => void;
  isLocked: boolean;
}

export const ParsonsOrderRenderer: React.FC<ParsonsOrderRendererProps> = ({
  exercise,
  currentOrder,
  onChangeOrder,
  isLocked
}) => {
  const availableBlocks = exercise.shuffledBlocks;

  const handleSelectBlock = (blockId: string) => {
    if (isLocked) return;
    if (currentOrder.includes(blockId)) {
      // Quitar del orden y devolver a disponibles
      onChangeOrder(currentOrder.filter((id) => id !== blockId));
    } else {
      // Añadir al orden
      onChangeOrder([...currentOrder, blockId]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
      {/* Área de Destino (Líneas Ordenadas) */}
      <div
        style={{
          minHeight: '120px',
          background: '#080c14',
          border: '2px dashed #2d3748',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-code)' }}>
          // Tu código en orden de ejecución:
        </span>
        {currentOrder.length === 0 && (
          <div style={{ color: '#475569', fontSize: '13px', fontStyle: 'italic', margin: 'auto' }}>
            Toca los bloques inferiores para ordenarlos aquí
          </div>
        )}
        {currentOrder.map((id: string, idx: number) => {
          const block = exercise.shuffledBlocks.find((b) => b.id === id);
          if (!block) return null;
          return (
            <div
              key={id}
              onClick={() => handleSelectBlock(id)}
              style={{
                background: '#1e293b',
                border: '1px solid #38bdf8',
                borderRadius: '8px',
                padding: '10px 14px',
                fontFamily: 'var(--font-code)',
                fontSize: '13px',
                color: '#38bdf8',
                cursor: isLocked ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span style={{ color: '#64748b', fontSize: '11px' }}>{idx + 1}.</span>
              <span>{block.code}</span>
            </div>
          );
        })}
      </div>

      {/* Bloques Disponibles para Seleccionar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {availableBlocks.map((b: { id: string; code: string }) => {
          const isUsed = currentOrder.includes(b.id);
          return (
            <button
              key={b.id}
              type="button"
              disabled={isLocked || isUsed}
              onClick={() => handleSelectBlock(b.id)}
              style={{
                background: isUsed ? '#0f172a' : '#1e293b',
                opacity: isUsed ? 0.35 : 1,
                border: '1px solid #2d3748',
                borderRadius: '8px',
                padding: '10px 14px',
                fontFamily: 'var(--font-code)',
                fontSize: '13px',
                color: 'white',
                cursor: isUsed || isLocked ? 'default' : 'pointer',
                boxShadow: isUsed ? 'none' : '0 2px 0 #0f172a'
              }}
            >
              {b.code}
            </button>
          );
        })}
      </div>
    </div>
  );
};
