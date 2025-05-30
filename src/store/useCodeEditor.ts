import { create } from 'zustand';
import { LANGUAGE_CONFIG } from '@/app/(root)/_constants';
import { Monaco } from '@monaco-editor/react';
import { CodeEditorState } from '@/types';
import { use } from 'react';
const getInitialState = () => {
    if (typeof window === 'undefined') {
        return {
            language: "javascript",
            fontSize: 14,
            theme: "vs-dark",

        }
    }
    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
    const savedFontSize = localStorage.getItem("editor-font-size") || "14";

    return {
        language: savedLanguage,
        theme: savedTheme,
        fontSize: Number(savedFontSize),
    }

}
export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
    const initialState = getInitialState();
    return {
        ...initialState,
        output: '',
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,

        getCode: () => get().editor?.getValue() || '',
        setEditor: (editor: Monaco) => {
            const savedCode = localStorage.getItem(`editor-code-${get().language}`) || '';
            if (savedCode) {
                editor.setValue(savedCode);
            }
            set({ editor });

        },
        setTheme: (theme: string) => {
            localStorage.setItem("editor-theme", theme);
            set({ theme });
        },
        setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", fontSize.toString());
            set({ fontSize });
        },
        setLanguage: (language: string) => {
            const currentCode = get().editor?.getValue();
            if (currentCode) {
                localStorage.setItem(`editor-code-${get().language}`, currentCode);
            }
            localStorage.setItem("editor-language", language);
            set({
                language,
                output: "",
                error: null,
            });
        },
        runCode: async () => {
            const { language, getCode } = get();
            const code = getCode();
            if (!code) {
                set({ error: "Code is empty" });
                return;
            }
            set({ isRunning: true, error: null });
            try {
                const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
                const respone = await fetch("https://emkc.org/api/v2/piston/execute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files: [{ content: code }],

                    })

                });
                const data = await respone.json();
                console.log(data);
                if(data.message){
                    set({ error: data.message,executionResult:{code,output:"",error:data.message}});
                    return;
                }
                if(data.compile && data.compile.code !== 0){
                    const error=data.compile.stderr || data.compile.output;
                    set({ error, executionResult: { code, output: "", error } });
                    return;
                }
                if(data.run && data.run.code !== 0) {
                    const error = data.run.stderr || data.run.output;
                    set({ error, executionResult: { code, output: "", error } });
                    return;
                }
                const output = data.run?.output || data.compile?.output || '';
                set({ output: output.trim(), error: null, executionResult: { code, output: output.trim(), error: null } });
            }
            catch (err) {
                console.error("Error executing code:", err);
                set({ error: "Failed to execute code", executionResult: { code, output: "", error: "Failed to execute code" } });
            }
            finally {
                set({ isRunning: false });
            }   
            

        }


    }
})
export const getExecutionResult = ()=> useCodeEditorStore.getState().executionResult;