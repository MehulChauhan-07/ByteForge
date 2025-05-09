import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

interface FlashcardComponentProps {
  flashcards: Flashcard[];
  subtopicTitle: string;
}

export const FlashcardComponent = ({
  flashcards,
  subtopicTitle,
}: FlashcardComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentFlashcard = flashcards[currentIndex];

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection(1);
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 200);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 200);
    }
  };

  const resetCards = () => {
    setDirection(0);
    setFlipped(false);
    setCurrentIndex(0);
  };

  return (
    <div className="my-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">{subtopicTitle} - Key Concepts</h3>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} of {flashcards.length}
        </div>
      </div>

      <div className="relative h-64 mb-4">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentFlashcard.id}
            custom={direction}
            initial={{ x: direction * 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => setFlipped(!flipped)}
            className="w-full h-full cursor-pointer perspective"
          >
            <motion.div
              className="w-full h-full relative preserve-3d drop-shadow-md"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Front side - Term */}
              <div className="absolute w-full h-full backface-hidden border rounded-lg p-6 flex items-center justify-center bg-white dark:bg-slate-950">
                <div className="text-center">
                  <h4 className="text-sm uppercase text-muted-foreground mb-2">
                    Term
                  </h4>
                  <p className="text-xl font-medium">{currentFlashcard.term}</p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Click to flip
                  </div>
                </div>
              </div>

              {/* Back side - Definition */}
              <div className="absolute w-full h-full backface-hidden border rounded-lg p-6 flex items-center justify-center bg-white dark:bg-slate-950 rotateY-180">
                <div className="text-center">
                  <h4 className="text-sm uppercase text-muted-foreground mb-2">
                    Definition
                  </h4>
                  <p className="text-lg">{currentFlashcard.definition}</p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Click to flip
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevCard}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <Button variant="outline" size="icon" onClick={resetCards}>
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={nextCard}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
