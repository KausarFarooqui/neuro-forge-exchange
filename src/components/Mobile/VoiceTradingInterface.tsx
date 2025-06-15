
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Smartphone, Shield } from 'lucide-react';

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  status: 'processing' | 'completed' | 'error';
  timestamp: Date;
}

const VoiceTradingInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  useEffect(() => {
    // Check for browser support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }

    // Check for biometric support
    if ('PublicKeyCredential' in window) {
      setBiometricEnabled(true);
    }

    // Mock recent commands
    const mockCommands: VoiceCommand[] = [
      {
        id: '1',
        command: 'Buy 100 shares of NVIDIA',
        action: 'BUY 100 NVDA at $875.23',
        status: 'completed',
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: '2',
        command: 'What is the price of Google?',
        action: 'GOOGL: $2,850.45 (+1.2%)',
        status: 'completed',
        timestamp: new Date(Date.now() - 600000)
      },
      {
        id: '3',
        command: 'Set alert for Tesla above 250',
        action: 'Alert created: TSLA > $250',
        status: 'completed',
        timestamp: new Date(Date.now() - 900000)
      }
    ];

    setCommands(mockCommands);
  }, []);

  const startVoiceRecognition = () => {
    if (!isSupported) return;

    setIsListening(true);
    setCurrentCommand('Listening...');

    // Simulate voice recognition
    setTimeout(() => {
      const mockCommands = [
        'Buy 50 shares of Apple',
        'Sell all my Tesla positions',
        'What is the price of Microsoft?',
        'Set alert for AMD above 170',
        'Show my portfolio performance'
      ];

      const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)];
      setCurrentCommand(randomCommand);

      setTimeout(() => {
        const newCommand: VoiceCommand = {
          id: Date.now().toString(),
          command: randomCommand,
          action: 'Processing command...',
          status: 'processing',
          timestamp: new Date()
        };

        setCommands(prev => [newCommand, ...prev.slice(0, 4)]);
        setIsListening(false);
        setCurrentCommand('');

        // Simulate processing
        setTimeout(() => {
          setCommands(prev => prev.map(cmd => 
            cmd.id === newCommand.id 
              ? { ...cmd, action: 'Command executed successfully', status: 'completed' }
              : cmd
          ));
        }, 2000);
      }, 1500);
    }, 1000);
  };

  const stopVoiceRecognition = () => {
    setIsListening(false);
    setCurrentCommand('');
  };

  const authenticateWithBiometric = async () => {
    if (!biometricEnabled) return;

    try {
      // Simulate biometric authentication
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: "Neural Insights Trading" },
          user: {
            id: new Uint8Array(16),
            name: "user@example.com",
            displayName: "Trading User"
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          }
        }
      });

      console.log('Biometric authentication successful:', credential);
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    }
  };

  const getStatusColor = (status: VoiceCommand['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400';
      case 'error': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-950/80 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            Mobile-First Trading Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Voice Trading Section */}
          <Card className="bg-slate-800/30 border-slate-700/30 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Voice Trading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isSupported ? (
                <div className="text-center py-8">
                  <Mic className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <div className="text-slate-400">Voice recognition not supported in this browser</div>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <Button
                      onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                      className={`w-32 h-32 rounded-full text-white ${
                        isListening 
                          ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                          : 'bg-cyan-600 hover:bg-cyan-700'
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="w-12 h-12" />
                      ) : (
                        <Mic className="w-12 h-12" />
                      )}
                    </Button>
                    <div className="mt-4">
                      <div className="text-white font-medium">
                        {isListening ? 'Listening...' : 'Tap to speak'}
                      </div>
                      {currentCommand && (
                        <div className="text-cyan-400 text-sm mt-2">"{currentCommand}"</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Voice Commands Examples:</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• "Buy 100 shares of NVIDIA"</li>
                      <li>• "Sell all my Tesla positions"</li>
                      <li>• "What is the price of Apple?"</li>
                      <li>• "Set alert for AMD above 170"</li>
                      <li>• "Show my portfolio performance"</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Biometric Authentication */}
          <Card className="bg-slate-800/30 border-slate-700/30 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Biometric Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Secure Trading Access</div>
                  <div className="text-slate-400 text-sm">
                    Use fingerprint or Face ID for secure trade execution
                  </div>
                </div>
                <Button
                  onClick={authenticateWithBiometric}
                  disabled={!biometricEnabled}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {biometricEnabled ? 'Enable Biometric' : 'Not Supported'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Voice Commands */}
          <Card className="bg-slate-800/30 border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">Recent Voice Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {commands.length === 0 ? (
                  <div className="text-center py-4 text-slate-400">
                    No voice commands yet
                  </div>
                ) : (
                  commands.map((command) => (
                    <div key={command.id} className="p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white text-sm">"{command.command}"</div>
                        <Badge className={getStatusColor(command.status)}>
                          {command.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-slate-300 text-sm mb-1">{command.action}</div>
                      <div className="text-slate-400 text-xs">
                        {command.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card className="bg-slate-800/30 border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">Push Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Badge className="bg-orange-500/20 text-orange-400 mb-4">
                  Coming Soon
                </Badge>
                <div className="text-slate-400">
                  Real-time market alerts and trade notifications
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceTradingInterface;
