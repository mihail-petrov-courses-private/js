const PHASE_BOOTSTRAP       = 1;
const PHASE_MOVE            = 2;
const PHASE_DETECT          = 3;
const PHASE_TAKE            = 4;
const PHASE_SELF_DESTRUCT   = 5;
const PHASE_SHUITDOWN       = 0;

var currentRunningPhase     = PHASE_BOOTSTRAP;

function isPhaseBootstrap() {
    return currentRunningPhase == PHASE_BOOTSTRAP;
}

function isPhaseMove() {
    return currentRunningPhase == PHASE_MOVE;
}

function isPhaseDetect() {
    return currentRunningPhase == PHASE_DETECT;
}

function isPhaseTake() {
    return currentRunningPhase == PHASE_TAKE;
}

function isPhaseSelfDestruct() {
    return currentRunningPhase == PHASE_SELF_DESTRUCT;
}

function isRunning() {
    return currentRunningPhase != PHASE_SHUITDOWN;
}
