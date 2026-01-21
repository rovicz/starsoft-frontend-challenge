import React from "react";
import {
  LoadMoreContainer,
  ProgressBarContainer,
  ProgressBarFill,
  LoadMoreButton,
  CompletionText,
  Spinner,
  SpinnerContainer
} from "./style";

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
    <LoadMoreContainer>
      <ProgressBarContainer>
        <ProgressBarFill 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />
      </ProgressBarContainer>

      {!isComplete && (
        <LoadMoreButton
          onClick={onLoadMore}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {isLoading ? (
            <SpinnerContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spinner />
              <span>Carregando...</span>
            </SpinnerContainer>
          ) : (
            "Carregar mais"
          )}
        </LoadMoreButton>
      )}

      {isComplete && (
        <CompletionText
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Você chegou ao fim da lista.
        </CompletionText>
      )}
    </LoadMoreContainer>
  );
}