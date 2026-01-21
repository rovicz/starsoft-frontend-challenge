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
        <ProgressBarFill $width={percentage} />
      </ProgressBarContainer>

      {!isComplete && (
        <LoadMoreButton
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? (
            <SpinnerContainer>
              <Spinner />
              <span>Carregando...</span>
            </SpinnerContainer>
          ) : (
            "Carregar mais"
          )}
        </LoadMoreButton>
      )}

      {isComplete && (
        <CompletionText>
          Você chegou ao fim da lista.
        </CompletionText>
      )}
    </LoadMoreContainer>
  );
}
