//
//  VideoEditorModule.swift
//  vesdkreactnativeintegrationsample
//
//  Created by Andrei Sak on 28.12.20.
//

import React
import BanubaVideoEditorSDK
import BanubaMusicEditorSDK
import BanubaOverlayEditorSDK
import VideoEditor
import VEExportSDK

@objc(VideoEditorModule)
class VideoEditorModule: NSObject, RCTBridgeModule {
  
  private var videoEditorSDK: BanubaVideoEditor?
  
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  private var currentResolve: RCTPromiseResolveBlock?
  private var currentReject: RCTPromiseRejectBlock?
  
  // Export callback
  @objc func openVideoEditor(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    self.currentResolve = resolve
    self.currentReject = reject
    
    let config = createVideoEditorConfiguration()
    videoEditorSDK = BanubaVideoEditor(
      token:"",
//      token: "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",
      configuration: config,
      externalViewControllerFactory: nil
    )
    
    // Set delegate
    videoEditorSDK?.delegate = self
    
    DispatchQueue.main.async {
      guard let presentedVC = RCTPresentedViewController() else {
        return
      }
      var musicTrackPreset: MediaTrack?
      
      // uncomment this if you want to set the music track
      
      //musicTrackPreset = self.setupMusicTrackPresent()
      
      let config = VideoEditorLaunchConfig(
        entryPoint: .camera,
        hostController: presentedVC,
        musicTrack: musicTrackPreset,
        animated: true
      )
      self.videoEditorSDK?.presentVideoEditor(
        withLaunchConfiguration: config,
        completion: nil
      )
    }
  }
  
  private func createVideoEditorConfiguration() -> VideoEditorConfig {
    let config = VideoEditorConfig()
    // Do customization here
    return config
  }
  // MARK: - Create music track
  private func setupMusicTrackPresent() -> MediaTrack {
    let documentsUrl = Bundle.main.bundleURL.appendingPathComponent("Music/long")
    let directoryContents = try? FileManager.default.contentsOfDirectory(at: documentsUrl, includingPropertiesForKeys: nil)
    let wavFile = directoryContents!.first(where: { $0.pathExtension == "wav" })!
    let urlAsset = AVURLAsset(url: wavFile)
    let urlAssetTimeRange = CMTimeRange(start: .zero, duration: urlAsset.duration)
    let mediaTrackTimeRange = MediaTrackTimeRange(
      startTime: .zero, playingTimeRange: urlAssetTimeRange
    )
    let musicTrackPreset = MediaTrack(
      id: 1231,
      url: wavFile,
      timeRange: mediaTrackTimeRange,
      isEditable: true,
      title: "test"
    )
    
    return musicTrackPreset
  }
  
  // MARK: - RCTBridgeModule
  static func moduleName() -> String! {
    return "VideoEditorModule"
  }
}

// MARK: - Export flow
extension VideoEditorModule {
  func exportVideo() {
    let manager = FileManager.default
    // File name
    let firstFileURL = manager.temporaryDirectory.appendingPathComponent("tmp1.mov")
    if manager.fileExists(atPath: firstFileURL.path) {
      try? manager.removeItem(at: firstFileURL)
    }
    
    // Video configuration
    let exportVideoConfigurations: [ExportVideoConfiguration] = [
      ExportVideoConfiguration(
        fileURL: firstFileURL,
        quality: .auto,
        useHEVCCodecIfPossible: true,
        watermarkConfiguration: nil
      )
    ]
    
    // Export Configuration
    let exportConfiguration = ExportConfiguration(
      videoConfigurations: exportVideoConfigurations,
      isCoverEnabled: true,
      gifSettings: nil
    )
    
    // Export func
    videoEditorSDK?.export(
      using: exportConfiguration
    ) { [weak self] (success, error, coverImage) in
      // Export Callback
      DispatchQueue.main.async {
        if success {
          // Result urls. You could interact with your own implementation.
          self?.currentResolve!(["videoUri": firstFileURL.absoluteString])
          // remove strong reference to video editor sdk instance
          self?.videoEditorSDK = nil
        } else {
          self?.currentReject!("", error?.errorMessage, nil)
          // remove strong reference to video editor sdk instance
          self?.videoEditorSDK = nil
          print("Error: \(String(describing: error))")
        }
      }
    }
  }
}

// MARK: - BanubaVideoEditorSDKDelegate
extension VideoEditorModule: BanubaVideoEditorDelegate {
  func videoEditorDidCancel(_ videoEditor: BanubaVideoEditor) {
    videoEditor.dismissVideoEditor(animated: true) { [weak self] in
      // remove strong reference to video editor sdk instance
      self?.videoEditorSDK = nil
      self?.currentResolve!(NSNull())
    }
  }
  
  func videoEditorDone(_ videoEditor: BanubaVideoEditor) {
    videoEditor.dismissVideoEditor(animated: true) { [weak self] in
      self?.exportVideo()
    }
  }
}
