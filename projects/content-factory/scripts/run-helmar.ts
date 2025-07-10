#!/usr/bin/env ts-node

// Import Helmar CEO agent třídy ze složky agents
import { HelmarCEO } from '../src/agents/ceo/helmar';

/**
 * Helmar CEO Agent Runner
 * Jednoduchý script pro spuštění Helmar samostatně pro testování
 * 
 * Tento script je užitečný pro:
 * - Testování nových funkcí před integrací
 * - Debugging problémů bez spuštění celého orchestrátoru
 * - Rychlé prototypování AI agent logiky
 */

/**
 * Hlavní funkce pro spuštění Helmar agenta
 * Async funkce nám umožňuje použít await pro čekání na Promise
 */
async function runHelmar() {
  // Uživatelsky přívětivý výstup s emoji pro vizuální rozlišení
  console.log('🤖 Starting Helmar CEO Agent...');
  
  // Vytvoř novou instanci Helmar CEO agenta
  // Konstruktor automaticky inicializuje všechny department managers
  const helmar = new HelmarCEO();
  
  try {
    // Spusť ranní briefing - klíčová část autonomního cyklu
    console.log('🌅 Running morning briefing...');
    // await čeká na dokončení asynchronní operace
    const briefing = await helmar.morningBriefing();
    // Vypiš výsledek briefingu pro debugging a monitoring
    console.log('📋 Morning briefing completed:', briefing);
    
    // Spusť strategické rozhodování - AI agent dělá business rozhodnutí
    console.log('🎯 Making strategic decisions...');
    const strategy = await helmar.makeStrategicDecisions();
    console.log('📊 Strategic decisions completed:', strategy);
    
    // Spusť management oddělení - koordinace mezi týmy
    console.log('👥 Managing departments...');
    await helmar.manageDepartments();
    console.log('✅ Department management completed');
    
    // Spusť generování večerního reportu - shrnutí dne
    console.log('🌆 Generating evening report...');
    const report = await helmar.eveningReport();
    console.log('📈 Evening report completed:', report);
    
    // Úspěšné dokončení celého cyklu
    console.log('🎉 Helmar CEO Agent completed daily cycle successfully!');
    
  } catch (error) {
    // Zachyť jakékoli chyby během testování
    console.error('❌ Error running Helmar:', error);
    // Ukončí proces s chybovým kódem - důležité pro CI/CD
    process.exit(1);
  }
}

// Kontrola zda je tento script spuštěn přímo (ne importován)
// require.main === module je Node.js pattern pro detekci přímého spuštění
if (require.main === module) {
  // Spusť main funkci a zachyť případné chyby
  runHelmar().catch(console.error);
}

// Export funkce pro možnost importu v jiných souborech
export { runHelmar };
