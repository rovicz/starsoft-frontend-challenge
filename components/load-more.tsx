import React from "react";

interface LoadMoreProps {
  currentCount: number;
  totalCount: number;
  isLoading: boolean;
  onLoadMore: () => void;
}

export function LoadMoreSection({
  currentCount,
  totalCount,
  isLoading,
  onLoadMore,
}: LoadMoreProps) {
  const percentage = Math.min((currentCount / totalCount) * 100, 100);
  const isComplete = currentCount >= totalCount;

  return (
    <div className="flex flex-col items-center w-full max-w-[345px] gap-4">
      <div className="w-full h-[10px] bg-[#393939] rounded-[8px] overflow-hidden">
        <div
          className="h-full bg-[#FF8310] transition-all duration-500 ease-out rounded-[8px]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {!isComplete && (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className="flex items-center justify-center w-full h-[66px] bg-[#191A20] text-[#FFFFFF] text-base rounded-[8px] hover:bg-[#2a2b36] transition-colors font-medium cursor-pointer text-center"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Carregando...</span>
            </div>
          ) : (
            "Carregar mais"
          )}
        </button>
      )}

      {isComplete && (
        <p className="text-[#CCCCCC] text-sm mt-2">
          Você chegou ao fim da lista.
        </p>
      )}
    </div>
  );
}
