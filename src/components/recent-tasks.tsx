"use client";

import { useRecentTaskStore } from "@/libs/zustand/store";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Modal } from "@/ui/modal";
import { cn } from "@/utils/tailwind/cn";

import { PlusIcon, SquareCheckBigIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export const RecentTasks = () => {
  const [task, setTask] = useState("");
  const [noTask, setNoTask] = useState(false);
  const [description, setDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState<number | null>(null);

  const { recentTasks, addRecentTask, deleteRecentTask } = useRecentTaskStore();

  useEffect(() => {
    if (!openModal) {
      setTask("");
      setDescription("");
      setNoTask(false);
    }
  }, [openModal]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // No Task
    if (!task) {
      setNoTask(true);
      return;
    }

    addRecentTask(task, description);

    setTask("");
    setDescription("");
    setOpenModal(false);
  };

  const selectedTask = recentTasks.find((task) => task.createdAt === openDetailModal);

  return (
    <div className="w-2/3 space-y-4">
      <div className="bg-element space-y-4 rounded-3xl border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-bold">
            <SquareCheckBigIcon />
            Recent Tasks
          </h2>
          <Modal
            open={openModal}
            onOpenChange={setOpenModal}
            trigger={
              <Button
                variant="ghost"
                size="icon"
              >
                <PlusIcon />
              </Button>
            }
            className="bg-element w-full max-w-xl !rounded-3xl border p-6 shadow-lg"
            title="Add Bookmark"
          >
            <form
              onSubmit={handleOnSubmit}
              className="space-y-4"
            >
              <Input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className={cn(
                  "w-full !rounded-2xl border px-3 py-2",
                  noTask && "!border-red-500 focus-within:ring-red-500"
                )}
                placeholder="Task"
                autoFocus
              />
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full !rounded-2xl border px-3 py-2"
                placeholder="Description"
              />
              <Button
                className="sr-only"
                type="submit"
              >
                submit
              </Button>
            </form>
          </Modal>
        </div>
      </div>

      {recentTasks.length > 0 && (
        <div className="space-y-4">
          {recentTasks.map(({ task, description, createdAt }) => (
            <div
              key={createdAt}
              onClick={() => setOpenDetailModal(createdAt)}
              className="bg-element flex cursor-pointer items-center justify-between gap-2 rounded-3xl
border px-6 py-3 shadow-lg hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              <div className="flex items-center gap-4">
                <h3 className="line-clamp-1 font-semibold">{task}</h3>
                <h4 className="line-clamp-1">{description}</h4>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-400 dark:hover:bg-red-400"
                onClick={(e) => {
                  e.preventDefault();
                  deleteRecentTask(createdAt);
                }}
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y: 0 }}
            className="absolute top-0 left-0 h-screen w-screen backdrop-blur-xs"
          >
            <Modal
              open={!!selectedTask}
              onOpenChange={(open) => {
                if (!open) setOpenDetailModal(null);
              }}
              trigger={<></>}
              title={selectedTask.task}
              className="bg-element w-full max-w-xl !rounded-3xl border p-6 shadow-lg"
            >
              <div>{selectedTask.description}</div>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
