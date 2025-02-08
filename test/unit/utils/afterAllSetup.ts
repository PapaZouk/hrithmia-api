export const afterAllSetup = () => {
    (console.log as any).restore();
    (console.error as any).restore();
}