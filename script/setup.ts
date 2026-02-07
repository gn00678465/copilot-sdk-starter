import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, symlinkSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';

/**
 * Setup script for copilot-sdk-starter.
 * This script checks if the 'copilot-sdk' skill is already installed.
 * If installed, it runs an update. Otherwise, it performs a fresh installation.
 */

const SKILL_NAME = 'copilot-sdk';
const SOURCE_REPO = 'github/awesome-copilot';
const AGENTS = ['claude-code', 'github-copilot', 'gemini-cli'] as const;

type Agent = typeof AGENTS[number];
type GeminiAndCopilotAgent = Exclude<Agent, 'claude-code'>;

const AGENT_DIR_MAP: Record<GeminiAndCopilotAgent, string> = {
  'github-copilot': '.github',
  'gemini-cli': '.gemini'
};

function createSymlink(agent: GeminiAndCopilotAgent, skillName: string) {
  const root = process.cwd();
  const agentDir = AGENT_DIR_MAP[agent];
  
  if (!agentDir) return;

  const target = resolve(root, '.agents', 'skills', skillName);
  const link = resolve(root, agentDir, 'skills', skillName);
  const linkDir = resolve(root, agentDir, 'skills');

  console.log(`Creating symbolic link for ${agent}: ${link} -> ${target}`);

  try {
    if (!existsSync(linkDir)) {
      mkdirSync(linkDir, { recursive: true });
    }

    if (existsSync(link)) {
      rmSync(link, { recursive: true, force: true });
    }

    symlinkSync(target, link, 'junction');
    console.log(`✅ Symbolic link for ${agent} created successfully!`);
  } catch (error) {
    console.error(`❌ Failed to create symbolic link for ${agent}:`);
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

function main() {
  try {
    console.log(`Checking status of skill: ${SKILL_NAME}...`);
    
    // Check if skill is installed in the project scope
    const listOutput = execSync('npx skills list', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    const isInstalled = listOutput.includes(SKILL_NAME);

    if (isInstalled) {
      console.log(`Skill '${SKILL_NAME}' is already installed. Running update...`);
      execSync('npx skills update', { stdio: 'inherit' });
    } else {
      console.log(`Skill '${SKILL_NAME}' not found. Installing...`);
      const agentFlags = AGENTS.map(agent => `-a ${agent}`).join(' ');
      const command = `npx skills add ${SOURCE_REPO} -s ${SKILL_NAME} ${agentFlags} -y`;
      
      console.log(`Executing: ${command}`);
      execSync(command, { stdio: 'inherit' });
    }

    // Create symlinks for all agents
    for (const agent of AGENTS) {
      if (agent === 'claude-code') continue;
      createSymlink(agent, SKILL_NAME);
    }
    
    console.log('\n✅ Setup completed successfully!');
  } catch (error) {
    console.error('\n❌ Setup failed:');
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
}

main();
