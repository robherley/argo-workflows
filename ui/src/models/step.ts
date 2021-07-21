import {ObjectMeta, Time, WatchEvent} from 'argo-ui/src/models/kubernetes';

export interface Metrics {
    total?: number;
    errors?: number;
    retries?: number;
    rate?: string;
}

export interface Step {
    metadata: ObjectMeta;
    spec: {
        name: string;
        cat?: {};
        container?: {};
        dedupe?: {};
        expand?: {};
        filter?: string;
        flatten?: {};
        git?: {};
        group?: {};
        handler?: {};
        map?: string;
        sources: {
            name?: string;
            cron?: {schedule: string};
            stan?: {name?: string; url?: string; subject: string};
            kafka?: {
                name?: string;
                url?: string;
                topic: string;
            };
            http?: {
                serviceName?: string;
            };
        }[];
        sinks: {
            name?: string;
            log?: {};
            stan?: {name?: string; url?: string; subject: string};
            kafka?: {
                name?: string;
                url?: string;
                topic: string;
            };
            http?: {url: string};
        }[];
    };
    status?: StepStatus;
}

export interface StepStatus {
    phase?: string;
    message?: string;
    replicas: number;
    lastScaledAt?: Time;
    sinkStatuses?: SinkStatuses;
    sourceStatuses?: SourceStatuses;
}

export interface SourceStatuses {
    [name: string]: {
        pending?: number;
        metrics?: {[name: string]: Metrics};
    };
}

export interface SinkStatuses {
    [name: string]: {
        metrics?: {[replica: string]: Metrics};
    };
}

export type StepWatchEvent = WatchEvent<Step>;