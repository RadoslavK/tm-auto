export type CompletableTaskAction = () => Promise<void>;

export const completableTaskActions: Map<string, CompletableTaskAction> = new Map<string, CompletableTaskAction>([]);